import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as d3 from "d3";

export const Informes = () => {
  const [difficulty, setDifficulty] = useState("all");
  const [heroType, setHeroType] = useState("all");
  const [personajes, setPersonajes] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [numEntradas, setNumEntradas] = useState(0);
  
  // Referencias para los gráficos
  const svgBarRef = useRef();
  const svgPieRef = useRef();

  const handleFile = (e) => {
    const archivo = e.target.files[0];
    
    Papa.parse(archivo, {
      complete: (resultado) => {
        console.log("Datos en bruto:", resultado.data);
        setPersonajes(resultado.data);
        setFiltrados(resultado.data);
      },
      skipEmptyLines: true,
      header: true,
    });
  };

  const handleFilter = () => {
    console.log("Filtros actuales:", difficulty, heroType);
    const filtrados = personajes.filter(p => {
      const difficultyFilter = difficulty === "all" || Number(p.difficulty) === Number(difficulty);
      const heroTypeFilter = heroType === "all" || p.herotype.toLowerCase() === heroType.toLowerCase();
      return difficultyFilter && heroTypeFilter;
    });
    console.log("Filtrados:", filtrados);
    setFiltrados(filtrados);
    setNumEntradas(filtrados.length);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 30;
    doc.text("Personajes del lol", 90, 20);
    doc.text("Informe de Personajes", 20, 30);
    
    const columns = [
      { title: "Nombre", dataKey: "title" },
      { title: "Dificultad", dataKey: "difficulty" },
      { title: "Tipo", dataKey: "herotype" }
    ];
    const data = filtrados.map(p => ({
      title: p.title,
      difficulty: p.difficulty === "3" ? "Difícil" : p.difficulty === "2" ? "Normal" : "Fácil",
      herotype: p.herotype.charAt(0).toUpperCase() + p.herotype.slice(1)
    }));
    
    doc.autoTable({
      startY: 40,
      head: [columns.map(col => col.title)],
      body: data.map(row => Object.values(row)),
      theme: 'grid', 
      headStyles: {
        fillColor: [228, 122, 122], 
        textColor: [240, 189, 189], 
        fontStyle: 'bold'
      },
      bodyStyles: {
        fillColor: [240, 189, 189],
        textColor: [228, 122, 122],  
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], 
      },
      styles: {
        lineColor: [0, 0, 0],      
        lineWidth: 0.1      
      }, foot: [
        [
            'Total de personajes',  // En el primer columna del pie
            '', // En blanco si no necesitas un valor en esa columna
            numEntradas.toString()  // El número total de personajes
        ]
    ]
    });

    const finalY = doc.autoTable.previous.finalY;
    doc.text(`Hay un total de ${numEntradas} entradas cuyas características son: dificultad: \n${difficulty} y tipo de héroe: ${heroType}`, 20, finalY + 10);
    
    doc.save("informe.pdf");
  };

  //Gráficos
  useEffect(() => {
    if (filtrados.length > 0) {
      // Gráfico de barras/dificultas
      const difficultyCounts = Array.from(d3.group(filtrados, d => d.difficulty), ([key, value]) => ({
        key: key === "3" ? "Difícil" : key === "2" ? "Normal" : "Fácil",
        value: value.length
      }));

      const svgBar = d3.select(svgBarRef.current)
        .attr("width", 500)
        .attr("height", 300);

      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = +svgBar.attr("width") - margin.left - margin.right;
      const height = +svgBar.attr("height") - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(difficultyCounts.map(d => d.key))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(difficultyCounts, d => d.value)])
        .nice()
        .range([height, 0]);

      svgBar.selectAll("*").remove();

      const gBar = svgBar.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      gBar.selectAll(".bar")
        .data(difficultyCounts)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue");

      gBar.append("g")
        .selectAll(".x-axis")
        .data([null])
        .enter().append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      gBar.append("g")
        .call(d3.axisLeft(y));

      // Gráfico de queso (pastel)/tipo de heroe
      const heroCounts = Array.from(d3.group(filtrados, d => d.herotype), ([key, value]) => ({
        key,
        value: value.length
      }));

      const svgPie = d3.select(svgPieRef.current)
        .attr("width", 400)
        .attr("height", 400)
        .append("g")
        .attr("transform", "translate(200,200)"); 

      const radius = Math.min(400, 400) / 2;

      const pie = d3.pie().value(d => d.value);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pieData = pie(heroCounts);

      svgPie.selectAll(".arc")
        .data(pieData)
        .enter().append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", d => color(d.data.key));

      svgPie.selectAll(".text")
        .data(pieData)
        .enter().append("text")
        .attr("transform", d => "translate(" + arc.centroid(d) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(d => d.data.key);
    }
  }, [filtrados]);

  return (
    <div>
      <div className="informeMain">
        <div className="informe-centered">
        <form>
          <div>
            <label>Cargar CSV</label>
            <input type="file" accept=".csv" onChange={handleFile} />
          </div>
          <div>
            <label>Dificultas</label>
            <select
              name="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="3">Difícil</option>
              <option value="2">Normal</option>
              <option value="1">Fácil</option>
            </select>
          </div>
          <div>
            <label>Tipo de Héroe</label>
            <select
              name="heroType"
              value={heroType}
              onChange={(e) => setHeroType(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="assassin">Asesino</option>
              <option value="tank">Tanque</option>
              <option value="support">Soporte</option>
              <option value="mage">Mago</option>
            </select>
          </div>
          <button type="button" onClick={handleFilter}>Filtrar</button>
          <button onClick={generatePDF}>Generar PDF</button>
        </form>
      </div>
      </div>
      <div className="informeMain">
          <div>
            <svg ref={svgBarRef}></svg>
          </div>
          <div>
            <svg ref={svgPieRef}></svg>
          </div>
      </div>
    </div>
  );
};
