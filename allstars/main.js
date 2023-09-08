

d3.csv("days_allstars_long.csv").then(function(data) {
    const totalData = d3.group(data, d => d.variable);
    const totalArray = Array.from(totalData, ([variable, values]) => ({ variable, total: d3.sum(values, d => +d.value) }));

    // Data is now loaded and parsed
    console.log(totalArray);

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", 1800)
        .attr("height", 2000);

    const margin = 20;
    const xOffset = 50;


    svg.append("text")
      .attr("x", 500) // Adjust the x-coordinate to center the title
      .attr("y", 30) // Adjust the y-coordinate to position the title
      .style("text-anchor", "middle") // Center the text horizontally
      .text("Bar Chart Title");



    // Create a scale for the y-axis based on your data range
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(totalArray, d => d.total)])
        .range([1500, 0]); // Adjust the range to fit your chart height

    // Add the y-axis to the SVG
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("transform", "translate (50,20)")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)") // Rotate the text to fit the y-axis
        .attr("x", -100) // Adjust the x-coordinate to position the label
        .attr("y", -10) // Adjust the y-coordinate to position the label
        .style("text-anchor", "middle")
        .text("Y-Axis Label");

    // Create a scale for the x-axis based on your categorical data (person names)
    const xScale = d3.scaleBand()
        .domain(totalArray.map(d => d.variable))
        .range([0, 1850]) // Adjust the range to fit your chart width
        .padding(0.2); // Add some padding between bars, adjust as needed

    // Add person names as x-axis labels below each bar
    svg.selectAll(".bar-label")
        .data(totalArray)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.variable) + xScale.bandwidth() / 2) // Position the label in the middle of each bar
        .attr("y", 2000) // Adjust the y-coordinate to position the labels below the bars
        .style("text-anchor", "middle") // Center the text horizontally
        .text(d => d.variable);

    // Add the x-axis to the SVG
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("transform", "translate (50,1520)")
        .call(xAxis);
    
    
    svg.selectAll("rect")
        .data(totalArray)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 40 + xOffset + 15)
        .attr("y", (d) => 1500 - +d.total + margin) 
        .attr("width", 25)
        .attr("height", (d) => +d.total) 
        .attr("fill", "blue");
})