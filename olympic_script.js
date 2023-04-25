class View {
    constructor(selector, label, color) {
      this.selector = selector;
      this.label = label;
      this.color = color;
      this.svg = d3.select(selector).append("svg");
      this.rect = this.svg.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", this.color);
      this.textLabel = this.svg.append("text").attr("class", "label").attr("x", "50%").attr("y", "50%").text(this.label);
      this.textInteraction = this.svg.append("text").attr("class", "interaction").attr("dy", "60%").attr("dx", "50%");
      this.rect.on("click", () => this.onClick());
    }
  
    setTextInteraction(text) {
      this.textInteraction.text(text);
    }
  
    onClick() {
      for (const view of views) {
        if (view.label == this.label) {
            view.setTextInteraction(`I was clicked!`);
        } else {
            view.setTextInteraction(`I am ${view.label}, ${this.label} was clicked`);
        }
      }
    }
  }
  
  
  const view1 = new View("#container1", "A", "red");
  const view2 = new View("#container2", "B", "green");
  const view3 = new View("#container3", "C", "blue");
  const view4 = new View("#container4", "D", "orange");
  
  const views = [view1, view2, view3, view4];
  