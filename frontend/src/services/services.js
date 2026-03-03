async function postData(endpoint, obj) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const respuesta = await peticion.json();
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}

async function getData(endpoint) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/${endpoint}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getData:', error);
    return [];
  }
};


async function putData(endpoint, obj) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const respuesta = await peticion.json();
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}

async function deleteData(endpoint) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const respuesta = await peticion.json();
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}

async function enviarRecurso(recurso, nuevoRecurso) {
  try {
    const respuesta = await fetch(`http://127.0.0.1:8000/${recurso}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoRecurso)
    });

    const resultado = await respuesta.json();
    console.log("Recurso guardado:", resultado);
    return resultado;
  } catch (error) {
    console.error("Error al guardar el recurso:", error);
  }
}

async function obtenerMentorias() {
  try {
    const respuesta = await fetch(`http://127.0.0.1:8000/mentorias/`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const resultado = await respuesta.json();
    console.log("Mentorías obtenidas:", resultado);
    return resultado;
  } catch (error) {
    console.error("Error al obtener las mentorías:", error);
  
  }
}

const loginUsuario = async (username, password) => {
  const response = await fetch("http://127.0.0.1:8000/usuarios/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return response.json();
};




export { postData, getData, putData, deleteData, enviarRecurso, obtenerMentorias, loginUsuario };