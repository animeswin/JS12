document.addEventListener("DOMContentLoaded", () => {
    const inputTituloNota = document.getElementById("tituloNota")
    const botaoAdicionarNota = document.getElementById("adicionarNota")
    const listaNotas = document.getElementById("listaNotas")

    const carregarNotas = () => {
        const notasSalvas = localStorage.getItem("notas")
        return notasSalvas ? JSON.parse(notasSalvas) : []
    }

    const salvarNotas = (notas) => {
        localStorage.setItem("notas", JSON.stringify(notas))
    }

    const atualizarListaNotas = () => {
        const notas = carregarNotas()
        listaNotas.innerHTML = ""
        notas.forEach((nota, indice) => {
            const itemNota = document.createElement("li")
            itemNota.textContent = nota

            const botaoRemover = document.createElement("button")
            botaoRemover.textContent = "Remover"
            botaoRemover.addEventListener("click", () => {
                const novasNotas = notas.filter((_, i) => i !== indice)
                salvarNotas(novasNotas)
                atualizarListaNotas()
            })

            itemNota.appendChild(botaoRemover)
            listaNotas.appendChild(itemNota)
        })
    }

    botaoAdicionarNota.addEventListener("click", () => {
        const titulo = inputTituloNota.value.trim()
        if (titulo === "") {
            alert("O título da nota não pode estar vazio.")
            return
        }

        const notas = carregarNotas()
        if (notas.includes(titulo)) {
            alert("A nota já existe.")
            return
        }

        notas.push(titulo)
        salvarNotas(notas)
        atualizarListaNotas()
        inputTituloNota.value = ""
    })

    atualizarListaNotas();
})