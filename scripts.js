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
      data.passageiros.forEach(item => insertList(item.id,item.nome, item.cpf, item.flight))
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
const postItem = async (inputPassageiro, inputCPF, inputFlight) => {
  
  var data={
    nome: inputPassageiro,
    cpf: inputCPF,
    flight: inputFlight
  };

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
      insertList(data.id,inputPassageiro, inputCPF, inputFlight);
      alert("Passageiro adicionado!");
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Erro ao adicionar o passageiro!");
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
const putItem = async (id, inputPassageiro, inputCPF, inputFlight) => {

  var data={
    id: id,
    nome: inputPassageiro,
    cpf: inputCPF,
    flight: inputFlight
  };

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
      updateList(data.id,inputPassageiro, inputCPF, inputFlight);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Erro ao editar passageiro!");
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar um item da lista apos a edicao
  --------------------------------------------------------------------------------------
*/
const updateList = (id, namePassageiro, cpf, flight) => {

  var table = document.getElementById('myTable');
  var line = 0;

  while(row=table.rows[line++]){
    const rowId = row.id;
    console.log('Row ID:', rowId);
    if (rowId==id){
      row.cells[0].innerHTML=namePassageiro;
      row.cells[1].innerHTML=cpf;
      row.cells[2].innerHTML=flight;
    }
    
  }

  document.getElementById("ProcessBtn").innerHTML= "Adicionar"
  document.getElementById("newPassageiro").value = "";
  document.getElementById("newCPF").value = "";
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
      const flight = div.getElementsByTagName('td')[2].innerHTML
      document.getElementById("id").value = rowId;
      document.getElementById("newPassageiro").value = nome;
      document.getElementById("newCPF").value = cpf;
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
  var inputFlight = document.getElementById("newFlight").value;

  if (document.getElementById("ProcessBtn").innerHTML=== "Editar")
  {
    if (inputPassageiro === '') {
      alert("Escreva o nome de um passageiro!")
    } else if (inputCPF === '') {
      alert("Entre com o CPF");
    } else if (inputFlight === '') {
      alert("Entre com o Voo!");
    } else {
      putItem(id,inputPassageiro, inputCPF, inputFlight);
    }
  }
  else{
    if (inputPassageiro === '') {
      alert("Escreva o nome de um passageiro!")
    } else if (inputCPF === '') {
      alert("Entre com o CPF");
    } else if (inputFlight === '') {
      alert("Entre com o Voo!");
    } else {
      postItem(inputPassageiro, inputCPF, inputFlight);
    }
  }

}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, namePassageiro, cpf, flight) => {
  var item = [id,namePassageiro, cpf, flight]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    if (i===0){
      row.id=item[0];
      console.log(item[0]);
    }
    else{
      var cel = row.insertCell(i-1);
      cel.textContent = item[i];
    }
  }
  insertButton(row.insertCell(-1))
  insertButton2(row.insertCell(-1))
  document.getElementById("newPassageiro").value = "";
  document.getElementById("newCPF").value = "";
  document.getElementById("newFlight").value = "";

  removeElement()
  updateElement()
}