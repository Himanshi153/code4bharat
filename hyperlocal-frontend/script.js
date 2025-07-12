document.addEventListener("DOMContentLoaded", () => {
  // === Shopper Page: QR Code Generation ===
  const reserveButton = document.getElementById("reserveBtn");
  if (reserveButton) {
    reserveButton.addEventListener("click", () => {
      const qrDiv = document.getElementById("qrcodeBox");
      qrDiv.innerHTML = "";
      const reservationID = "Reservation#98765";
      new QRCode(qrDiv, reservationID);
    });
  }

  // === Admin Page: Surplus Prediction ===
  const form = document.getElementById("productForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const productName = document.getElementById("productName").value;
      const category = document.getElementById("category").value;
      const expiry = new Date(document.getElementById("expiry").value);
      const quantity = parseInt(document.getElementById("quantity").value);

      const today = new Date();
      const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

      let surplusMsg = "";
      let discountMsg = "";

      if (daysLeft <= 1 || quantity >= 10) {
        surplusMsg = `⚠️ ${productName} might go unsold.`;
        discountMsg = `💸 Recommend: 40% discount`;
      } else if (daysLeft <= 3) {
        surplusMsg = `⏳ ${productName} has moderate risk.`;
        discountMsg = `💸 Recommend: 20% discount`;
      } else {
        surplusMsg = `✅ ${productName} likely to sell on time.`;
        discountMsg = `No discount needed.`;
      }

      document.getElementById("surplusMessage").innerText = surplusMsg;
      document.getElementById("discountMessage").innerText = discountMsg;
      document.getElementById("predictionBox").style.display = "block";

      form.reset();
    });
  }

  // === Impact Page: Stats + D3 Chart ===
  const items = document.getElementById("itemsCount");
  const meals = document.getElementById("mealsCount");
  const co2 = document.getElementById("co2Count");
  const users = document.getElementById("usersCount");

  if (items && meals && co2 && users) {
    // Dummy stats
    items.innerText = "156";
    meals.innerText = "98";
    co2.innerText = "42 kg";
    users.innerText = "23";

    // D3 bar chart
    const data = [
      { day: "Mon", items: 15 },
      { day: "Tue", items: 22 },
      { day: "Wed", items: 18 },
      { day: "Thu", items: 10 },
      { day: "Fri", items: 25 },
      { day: "Sat", items: 35 },
      { day: "Sun", items: 31 }
    ];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select("#impactChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3.scaleBand()
      .domain(data.map(d => d.day))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.items)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("fill", "#4caf50")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.day))
      .attr("y", d => y(d.items))
      .attr("height", d => y(0) - y(d.items))
      .attr("width", x.bandwidth())
      .attr("rx", 4);

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Y Axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }
});
