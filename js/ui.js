// Misma lógica de siempre: responder, iniciar el juego y mostrar frases al azar.
const UI = {
  el: id => document.getElementById(id),
  disponibles: [],
  historial: [],

  init() {
    document.querySelectorAll("[data-resp]").forEach(b =>
      b.onclick = e => this.responder(b.dataset.resp, e));
    this.el("continuar").onclick = () => this.iniciarJuego();
    this.el("siguiente").onclick = e => this.mostrarSiguiente(e);
  },

  responder(opcion, e) {
    const m = this.el("mensaje");
    m.textContent = RESPUESTAS[opcion];
    m.classList.remove("on"); void m.offsetWidth; m.classList.add("on");
    this.el("continuar").hidden = false;
    FX.burst(e.clientX, e.clientY, 10, true);
  },

  iniciarJuego() {
    this.el("inicio").hidden = true;
    this.el("juego").hidden = false;
    this.disponibles = [...COSAS];
    this.historial = [];
    this.el("listaHistorial").innerHTML = "";
    this.mostrarSiguiente();
  },

  mostrarSiguiente(e) {
    if (this.disponibles.length === 0) {
      this.el("siguiente").hidden = true;
      this.el("cosa").hidden = true;
      this.el("final").hidden = false;
      FX.rain(6000);
      [.25, .5, .75].forEach((p, i) =>
        setTimeout(() => FX.burst(innerWidth * p, innerHeight * .4, 40, i === 1), i * 300));
      return;
    }

    const pos = Math.floor(Math.random() * this.disponibles.length);
    const frase = this.disponibles.splice(pos, 1)[0];
    this.historial.push(frase);

    const cosa = this.el("cosa");
    cosa.textContent = frase;
    cosa.classList.remove("nueva"); void cosa.offsetWidth; cosa.classList.add("nueva");

    const n = this.historial.length, t = COSAS.length;
    this.el("numero").textContent = n + " / " + t;
    this.el("relleno").style.width = (n / t * 100) + "%";

    const li = document.createElement("li");
    li.textContent = frase;
    this.el("listaHistorial").appendChild(li);
    const h = document.querySelector(".historial");
    h.scrollTop = h.scrollHeight;

    if (e && e.clientX !== undefined) FX.burst(e.clientX, e.clientY, 8, true);
    else { const r = cosa.getBoundingClientRect(); FX.burst(r.left + r.width / 2, r.top, 10, true); }
  }
};
