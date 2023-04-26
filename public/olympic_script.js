d3.csv("athlete_events.csv").then(data => {

  let minAge = 100;
  let maxAge = 0;
  const countries = [];
    data.forEach(function(d) {
      const team = d.Team.split("-")[0];
      const medal = d.Medal;
      let found = false;
      for (let i = 0; i < countries.length; i++) {
        if (countries[i][0] === team) {
          countries[i][1][medal] += 1;
          if (medal == "Gold" || medal == "Silver" || medal == "Bronze") {
            countries[i][1]["Total"] += 1;
          }
          found = true;
          break;
        }
      }
      if (!found) {
        countries.push([team, { "Gold": 0, "Silver": 0, "Bronze": 0, "Total": 0}]);
        countries[countries.length-1][1][medal] += 1;
        countries[countries.length-1][1]["Total"] += 1;
      }
      if (d.Age != 'NA') {
        minAge = Math.min(minAge, d.Age)
        maxAge = Math.max(maxAge, d.Age)
      }
    });

  // Filter the top 20 countries by total medals
const top20 = countries.sort((a, b) => b[1].Total - a[1].Total).slice(0, 15);

// Set up the chart dimensions
const margin = { top: 40, right: 40, bottom: 50, left: 100 };
const width = 900 - margin.left - margin.right;
const height = 1000 - margin.top - margin.bottom;

// Create the x and y scales
const x = d3.scaleLinear()
  .range([0, width])
  .domain([0, d3.max(top20, d => d[1].Total)]);

const y = d3.scaleBand()
  .range([0, height])
  .domain(top20.map(d => d[0]))
  .padding(0.1);

// Create the chart SVG
const svg = d3.select("#section1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
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

// Append the bars to the chart
svg.selectAll(".bar")
  .data(top20)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", 0)
  .attr("y", d => y(d[0]))
  .attr("width", d => x(d[1].Total))
  .attr("height", y.bandwidth())
  .attr("fill", "steelblue")
  .append("title")
  .text(d => `${d[0]}: Gold - ${d[1].Gold}, Silver - ${d[1].Silver}, Bronze - ${d[1].Bronze}`);


// Append the gold bars to the chart
svg.selectAll(".gold")
  .data(top20)
  .enter().append("rect")
  .attr("class", "gold")
  .attr("x", 0)
  .attr("y", d => y(d[0]))
  .attr("width", d => x(d[1].Gold))
  .attr("height", y.bandwidth())
  .attr("fill", "gold");

// Append the gold count to each bar
svg.selectAll(".gold-count")
  .data(top20)
  .join("text")
  .attr("class", "gold-count")
  .attr("x", d => x(d[1].Gold) - 40)
  .attr("y", d => y(d[0]) + y.bandwidth() / 2)
  .text(d => d[1].Gold);

// Append the silver bars to the chart
svg.selectAll(".silver")
  .data(top20)
  .enter().append("rect")
  .attr("class", "silver")
  .attr("x", d => x(d[1].Gold))
  .attr("y", d => y(d[0]))
  .attr("width", d => x(d[1].Silver))
  .attr("height", y.bandwidth())
  .attr("fill", "silver");

// Append the silver count to each bar
svg.selectAll(".silver-count")
  .data(top20)
  .join("text")
  .attr("class", "silver-count")
  .attr("x", d => x(d[1].Gold + d[1].Silver) - 40)
  .attr("y", d => y(d[0]) + y.bandwidth() / 2)
  .text(d => d[1].Silver);

// Append the bronze bars to the chart
svg.selectAll(".bronze")
  .data(top20)
  .enter().append("rect")
  .attr("class", "bronze")
  .attr("x", d => x(d[1].Gold) + x(d[1].Silver))
  .attr("y", d => y(d[0]))
  .attr("width", d => x(d[1].Bronze))
  .attr("height", y.bandwidth())
  .attr("fill", "peru");

// Append the bronze count to each bar
svg.selectAll(".bronze-count")
  .data(top20)
  .join("text")
  .attr("class", "bronze-count")
  .attr("x", d => x(d[1].Gold + d[1].Silver + d[1].Bronze) - 40)
  .attr("y", d => y(d[0]) + y.bandwidth() / 2)
  .attr("dy", "0.35em")
  .text(d => d[1].Bronze);

  // Append the total count to each bar
svg.selectAll(".total-count")
.data(top20)
.join("text")
.attr("class", "total-count")
.attr("x", d => x(d[1].Total) + 5)
.attr("y", d => y(d[0]) + y.bandwidth() / 2)
.attr("dy", "0.35em")
.text(d => d[1].Total);

// Append the chart title
svg.append("text")
   .attr("class", "chart-title")
   .attr("x", width / 2)
   .attr("y", -margin.top / 2)
   .attr("text-anchor", "middle")
   .text("Top 15 Countries with the Most Medals");
   

});