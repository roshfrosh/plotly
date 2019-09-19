function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`metadata/${sample}`).then((data) => {

  
    // Use d3 to select the panel with id of `#sample-metadata`
  var metadata_panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
  metadata_panel.html("")
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
  Object.defineProperties(data).forEach(([key, value]) => {
    metadata_panel.append("h6").text(`${key}: ${value}`);
  })
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
});
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {

    // @TODO: Build a Bubble Chart using the sample data
  var bubble_chart_data =[{
    x: data.otu_ids,
    y: data.sample_values,
    mode: 'markers',
    text: data.otu_labels,
    marker:{
      color: data.otu_ids,
      size: data.sample_values,
      colorscale: "Earth"
    }
    }
  ];
    var bubble_chart = {
      showlegend: false,
      margin: { t: 0 },
      hovermode: "closest",
      title: { title: "Belly Button Biodiversity" }

    };
  Plotly.newPlot('bubble', bubble_chart_data, bubble_chart);

  
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var data = [{
      values: data.sample_values.slice(0,10),
      value_labels: data.otu_ids.slice(0,10),
      hovertxt: data.otu_labels.slice(0,10),
      type: 'pie',
    }];
    var pie_chart={
      showlegend = true,
      margin: { t: 0, l: 0 }
    };
    Plotly.newPlot('pie', data, pie_chart);
  }   

  )}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
