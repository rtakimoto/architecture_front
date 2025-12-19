/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  const url = 'http://127.0.0.1:5000/passageiros';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.passageiros.forEach(item => insertList(item.id,item.nome, item.cpf, item.birthdate, item.flight))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputPassageiro, inputCPF, inputBirthDate, inputFlight) => {
  
  var data={
    nome: inputPassageiro,
    cpf: inputCPF,
    birthdate: inputBirthDate,
    flight: inputFlight
  };
  const situacao_cadastral = "REGULAR";

  const CPF_url = 'http://localhost:5000/external-data?cpf=' + inputCPF + '&birthdate=' + inputBirthDate;
 
  // GET request using fetch()
  fetch(CPF_url, {
      
      // Adding method type
      method: "GET",
      // Adding body or contents to send
      body: JSON.stringify(),
      // Adding headers to the request
      headers: {
          "Content-type": "application/json;"
      }
  })

  // Converting to JSON
  .then(response => response.json())

  // Displaying results to console

  .then((json) => {
    console.log(json);
    var code=json.code;
    var count=json.count;
    var nome=json.nome;
    var situacao=json.situacao;
    console.log(code);
    console.log(count);
    console.log(nome);
    console.log(situacao);
    if (count === 0) {
      alert("Informação de passageiro não consta na receita federal!");
    }else {
      
      if (equalsIgnoreCase(nome, inputPassageiro) !== true){
        alert("CPF informado não pertence ao nome do passageiro informado!");
      }
      else if (equalsIgnoreCase(situacao, situacao_cadastral) !== true) {
        alert("Situação do passageiro irregular na receita federal!");
      }
      else {
        // Adiciona passageiro
        const url = 'http://127.0.0.1:5000/passageiro';
        fetch(url, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.id);
            insertList(data.id,inputPassageiro, inputCPF, inputBirthDate, inputFlight);
            alert("Passageiro adicionado!");
          })
          .catch((error) => {
            console.error('Error:', error);
            alert("Erro ao adicionar o passageiro!");
          });      
      }
    } 
  })
  .catch((error) => {
    console.error('Error:', error);
    alert("Erro ao chamar api externa!");
  });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão edit para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton2 = (parent) => {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00BA");
  span.className = "edit";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para editar um item na lista do servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const putItem = async (id, inputPassageiro, inputCPF, inputBirthDate,inputFlight) => {

  var data={
    id: id,
    nome: inputPassageiro,
    birthdate: inputBirthDate,
    cpf: inputCPF,
    flight: inputFlight
  };
  const situacao_cadastral = "REGULAR";

  const CPF_url = 'http://localhost:5000/external-data?cpf=' + inputCPF + '&birthdate=' + inputBirthDate;
 
  // GET request using fetch()
  fetch(CPF_url, {
      
      // Adding method type
      method: "GET",
      // Adding body or contents to send
      body: JSON.stringify(),
      // Adding headers to the request
      headers: {
          "Content-type": "application/json;"
      }
  })

  // Converting to JSON
  .then(response => response.json())

  // Displaying results to console

  .then((json) => {
    console.log(json);
    var code=json.code;
    var count=json.count;
    var nome=json.nome;
    var situacao=json.situacao;
    console.log(code);
    console.log(count);
    console.log(nome);
    console.log(situacao);
    if (count === 0) {
      alert("Informação de passageiro não consta na receita federal!");
    }else {
      
      if (equalsIgnoreCase(nome, inputPassageiro) !== true){
        alert("CPF informado não pertence ao nome do passageiro informado!");
      }
      else if (equalsIgnoreCase(situacao, situacao_cadastral) !== true) {
        alert("Situação do passageiro irregular na receita federal!");
      }
      else {
        //inicio edita passageiro
        const url = 'http://127.0.0.1:5000/passageiro';
        fetch(url, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.id);
            console.log(inputBirthDate.substring(0, 10));
            updateList(data.id,inputPassageiro, inputCPF, inputBirthDate.substring(0, 10), inputFlight);
          })
          .catch((error) => {
            console.error('Error:', error);
            alert("Erro ao editar passageiro!");
          });      
      }            

    } 
  })
  .catch((error) => {
    console.error('Error:', error);
    alert("Erro ao chamar api externa!");
  });  
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar um item da lista apos a edicao
  --------------------------------------------------------------------------------------
*/
const updateList = (id, namePassageiro, cpf, birthdate, flight) => {

  var table = document.getElementById('myTable');
  var line = 0;

  while(row=table.rows[line++]){
    const rowId = row.id;
    console.log('Row ID:', rowId);
    if (rowId==id){
      row.cells[0].innerHTML=namePassageiro;
      row.cells[1].innerHTML=cpf;
      row.cells[2].innerHTML=birthdate;
      row.cells[3].innerHTML=flight;
    }
    
  }

  document.getElementById("ProcessBtn").innerHTML= "Adicionar"
  document.getElementById("newPassageiro").value = "";
  document.getElementById("newCPF").value = "";
  document.getElementById("newBirthDate").value = "";
  document.getElementById("newFlight").value = "";
  alert("Passageiro editado!");
}

/*
  --------------------------------------------------------------------------------------
  Função para editar um item da lista de acordo com o click no botão edit
  --------------------------------------------------------------------------------------
*/
const updateElement = () => {
  var edit = document.getElementsByClassName("edit");
  // var table = document.getElementById('myTable');
  var i;
  for (i = 0; i < edit.length; i++) {
    edit[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const rowId = this.parentElement.parentElement.id;
      console.log('Row ID:', rowId);
      const nome = div.getElementsByTagName('td')[0].innerHTML
      const cpf = div.getElementsByTagName('td')[1].innerHTML
      const birthdate = div.getElementsByTagName('td')[2].innerHTML
      const flight = div.getElementsByTagName('td')[3].innerHTML
      document.getElementById("id").value = rowId;
      document.getElementById("newPassageiro").value = nome;
      document.getElementById("newCPF").value = cpf;
      document.getElementById("newBirthDate").value = birthdate;
      document.getElementById("newFlight").value = flight;
      document.getElementById("ProcessBtn").innerHTML= "Editar";
    }
  }
}



/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  var close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement.parentElement;
      const cpf = div.getElementsByTagName('td')[1].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(cpf);
        alert("Removido!");
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  
  const url = 'http://127.0.0.1:5000/passageiro?cpf=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo passageiro com nome, cpf e peso 
  --------------------------------------------------------------------------------------
*/
const ProcessItem = () => {
  var id = document.getElementById("id").value;
  var inputPassageiro = document.getElementById("newPassageiro").value;
  var inputCPF = document.getElementById("newCPF").value;
  var inputBirthDate = document.getElementById("newBirthDate").value;
  var inputFlight = document.getElementById("newFlight").value;
  var bValidado = true;
  var time = "T12:00:00";

  if (inputPassageiro === '') {
    alert("Escreva o nome de um passageiro!");
    bValidado = false;
  } else if (inputCPF === '') {
    alert("Entre com o CPF");
    bValidado = false;
  } else if (inputBirthDate === '') {
    alert("Entre com a data de nascimento!");
    bValidado = false;
  } else if (inputFlight === '') {
    alert("Entre com o Voo!");
    bValidado = false;
  } 

  //valida CPF
  if (bValidado && verificarCPF(inputCPF)===false) {
    alert("CPF inválido! Entrar somente com os números válidos do CPF");
    bValidado = false;
  }

  // Valida data de nascimento
  if (bValidado && isValidFormat(inputBirthDate)===false) {
    alert("O formato da data está incorreto! Use AAAA-MM-DD");
    bValidado = false;
  }

  if (bValidado && isValidDate(inputBirthDate)===false) {
    alert("Número de data inválido!");
    bValidado = false;
  }

  var BirthDateTime = inputBirthDate.concat(time);

  //validacao adicional de API externa do back
  //if (bValidado && ValidaPassageiro(inputPassageiro,inputCPF, inputBirthDate)===false){
  //  bValidado = false;
  //}

  console.log(bValidado);

  if (document.getElementById("ProcessBtn").innerHTML=== "Editar")
  {
    if (bValidado){
      putItem(id,inputPassageiro, inputCPF, BirthDateTime, inputFlight);
    }
  }
  else{
    if (bValidado){
      postItem(inputPassageiro, inputCPF, BirthDateTime, inputFlight);
    }
  }

}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, namePassageiro, cpf, birthdate, flight) => {
  var item = [id,namePassageiro, cpf, birthdate, flight]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    if (i===0){
      row.id=item[0];
    }
    else{
      var cel = row.insertCell(i-1);
      console.log(item[i], i);
      if (i===3){
        // Extract components
        const date = new Date(item[i]);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;    // Months are 0-based, so add 1
        const day = date.getDate();
        cel.textContent= year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      }
      else{
        cel.textContent = item[i];
      }
    }
  }
  insertButton(row.insertCell(-1))
  insertButton2(row.insertCell(-1))
  document.getElementById("newPassageiro").value = "";
  document.getElementById("newCPF").value = "";
  document.getElementById("newBirthDate").value = "";
  document.getElementById("newFlight").value = "";

  removeElement()
  updateElement()
}

function isValidFormat(dateString) {
  // Check format using regex: YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false; // Format doesn't match
  }
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return date.isValid(dateString);
}


Date.prototype.isValid = function (dateString) {
    // Compare the original date string with the date object
    return this.getTime() === this.getTime() && dateString === this.toISOString().slice(0, 10);
};

function verificarCPF(strCpf) {
    if (!/[0-9]{11}/.test(strCpf)) return false;
    if (strCpf === "00000000000") return false;
    var soma = 0;

    console.log("Início validação CPF");
    for (var i = 1; i <= 9; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }
    console.log(soma);
    var resto = soma % 11;
    console.log(resto);

    if (resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }
    if (resto !== parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    console.log("Segundo digito - validação CPF");
    for (var i = 1; i <= 10; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    console.log(soma);
    resto = soma % 11;
    console.log(resto);
    if (resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }
    if (resto !== parseInt(strCpf.substring(10, 11))) {
        return false;
    }
    return true;
}

//Compara nomes ignorando maiusculo e minusculo
function equalsIgnoreCase(str1, str2) {

    // Validate inputs
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        return false; // Non-string inputs are not equal
    }

    // Compare after converting both to lowercase
    return str1.toLowerCase() === str2.toLowerCase();
}
