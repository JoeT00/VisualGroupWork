d3.csv("athlete_events.csv").then(data => {

    // Parse the data
    data.forEach(d => {
      d.Age = +d.Age; // Convert age to number
      d.Year = +d.Year; // Convert year to number
      d.Medal = d.Medal || "None"; // Set default value for Medal to "None"
    });
  
    // Aggregate data by athlete and year
    const athleteData = d3.rollup(data, 
      v => {
        return {
          age: d3.mean(v, d => d.Age),
          totalMedals: d3.sum(v, d => ["Gold", "Silver", "Bronze"].includes(d.Medal) ? 1 : 0)
        };
      }, 
      d => d.ID,
      d => d.Year
    );
    
    // Transform the data into an array of objects
    const bubbleData = Array.from(athleteData, d => {
      return {
        id: d[0],
        data: Array.from(d[1], yearData => {
          return {
            year: +yearData[0],
            age: yearData[1].age,
            totalMedals: yearData[1].totalMedals
          };
        })
      };
    });
  
    // Flatten the data to an array of all bubbles
    const bubbles = bubbleData.flatMap(d => d.data.map(yearData => {
      return {
        id: d.id,
        year: yearData.year,
        age: yearData.age,
        totalMedals: yearData.totalMedals
      };
    }));
  
    // Set up the chart dimensions
    const margin = { top: 40, right: 40, bottom: 50, left: 100 };
    const width = 900 - margin.right;
    const height = 1000 - margin.top - margin.bottom;
  
    // Create the x, y, and radius scales
    const x = d3.scaleLinear()
      .domain(d3.extent(bubbles, d => d.age)) // Swap x and y domain
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain(d3.extent(bubbles, d => d.totalMedals)) // Swap x and y domain
      .range([height, 0]);
  
    const radius = d3.scaleSqrt()
      .domain(d3.extent(bubbles, d => d.totalMedals))
      .range([5, 20]);
  
    // Create the chart SVG
    const svg = d3.select("#section2")
      .append("svg")
      .attr("width", 800)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // Append the y-axis to the chart
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));
  
    // Append the x-axis to the chart
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
    // Append the bubbles to the chart
    svg.selectAll(".bubble")
      .data(bubbles)
      .enter().append("circle")
      .attr("class", "bubble")
      .attr("cx", d => x(d.age)) // Swap x and y
      .attr("cy", d => y(d.totalMedals)) // Swap
          .attr("r", d => radius(d.totalMedals))
      .style("fill", d => {
        if (d.totalMedals > 0) {
          return "gold"; // Set fill color to gold if athlete has won at least one medal
        } else {
          return "gray"; // Set fill color to gray if athlete has not won any medals
        }
      })
      .style("opacity", 0.7) // Set opacity of bubbles to 0.7
      .on("mouseover", handleMouseOver) // Add event listener for mouseover
      .on("mouseout", handleMouseOut); // Add event listener for mouseout

    // Append the chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .text("Age-Medal Distribuition");
  
    // Create a tooltip div element
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
    // Define the event handler for mouseover
    function handleMouseOver(event, d) {
      // Show tooltip with athlete's ID, year, age, and total medals
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html("ID: " + d.id + "<br>" +
                  "Year: " + d.year + "<br>" +
                  "Age: " + d.age + "<br>" +
                  "Total Medals: " + d.totalMedals)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    }
  
    // Define the event handler for mouseout
    function handleMouseOut() {
      // Hide tooltip
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    }

    
  
  }).catch(error => {
    console.log("Error loading data:", error);
  });
  