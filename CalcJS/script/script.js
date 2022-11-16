// Operação anterior
const PrevOperatText = document.querySelector("#PrevOperat");
// Operação atual
const CurrOperatText = document.querySelector("#CurrOperat");
// "Botões"
const btns = document.querySelectorAll("#ContainerBtn button");

//console.log(ContainerBtn);

class Calculator {
    constructor(PrevOperatText, CurrOperatText) {
        this.PrevOperatText = PrevOperatText;
        this.CurrOperatText = CurrOperatText;
        /* Valor que o usuario esta informando */
        this.CurrOperat = "";
    }
    /* Adiciona (recebe) os valores que o usuário esta informando */
    addDigit(digit) {
        /* Confirmar se o valor informado possui apenas um ponto */
        if(digit === "." && this.CurrOperatText.innerText.includes(".")) {
            return;
        }

        /*console.log(digit);*/
        this.CurrOperat = digit;
        /* Atualizar a tela */
        this.updateScreen();
    }
    /* Processamento dos valores informados pelo usuario */
    processOperation(operation) {
        /* Conferir de o valor de baixo esta vazio */
        if(this.CurrOperatText.innerText === "" && operation !== "C") {
            /* Mudar a operação */
            if (this.PrevOperatText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
        /*console.log(operation);*/
        /* "Salvar" os valores informados anteriormente e atuais */
        let operationValue;
        /* "Pega" o primeiro valor informado */
        const previous = +this.PrevOperatText.innerText.split(" ")[0];
        /* "Pega" o segundo valor informado */
        const current = +this.CurrOperatText.innerText;

        /* Verificar qual operação sera realizada */
        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDel();
                break;
            case "CE":
                this.processCE();
                break;
            case "C":
                this.processC();
                break;
            case "=":
                this.processEqual();
                break;
            default:
                return;
        }
    }
    /* Atualiza! Muda os valores que o usuário esta informado */
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        /* (+=) Pois esta concatenando os valores (numeros somados) */
        /*console.log(operationValue, operation, current, previous);*/
        if(operationValue === null) {        
        this.CurrOperatText.innerText += this.CurrOperat;
        }else {
            /* Conferir se o primeiro valor informado é zero
            Se sim, exibir o primeiro valor no campo CurrOperat (Operação atual) */
           if(previous === 0) {
            operationValue = current;
           }
           /* Apos a primeira conferencia, informa o proximo resultado de operação no campo CurrOperat (Operação atual) */
           /* String concatenada com o valor da conta mais a operação realizada por ultimo */
           this.PrevOperatText.innerText = `${operationValue} ${operation}`
           /* Zerar a ultima informação no CurrOperat */
           this.CurrOperatText.innerText = "";
        }
    }

    /* Mudança de operações matematicas */
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];
        /* Não receber operaçoes diferentes de +, -, / ou *. */
        if (!mathOperations.includes(operation)) {
            return
        }

        this.PrevOperatText.innerText =this.PrevOperatText.innerText.slice(0, -1) + operation;
    }

    /* (DEL) Deleta o ultimo digito */
    processDel() {
        this.CurrOperatText.innerText = this.CurrOperatText.innerText.slice(0, -1);
    }

    /* (CE) Limpar ultimo valor informado */
    processCE() {
        this.CurrOperatText.innerText = "";
    }

    /* (C) Limpar tudo! */
    processC() {
        this.CurrOperatText.innerText = "";
        this.PrevOperatText.innerText = "";
    }

    /* (=) Resultado! */
    processEqual() {
        const operation = PrevOperatText.innerText.split(" ")[1]
        this.processOperation(operation);
    }
}

const Calc = new Calculator(PrevOperatText, CurrOperatText);

// "Recebe" o valor de texto dos elementos selecionados(click)
btns.forEach((btn) => {

    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;
        /*console.log(value);*/
        if(+value >= 0 || value === ".") {
            /*Calc.addDigit("addDigit: " + value);*/
            /*console.log("Numero: " + value);*/
            Calc.addDigit(value);
        }else {
            /*console.log("Operação: " + value);*/
            Calc.processOperation(value);
        }
    });
});