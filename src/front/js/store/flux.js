const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
		},
		actions: {

			login: async (dataToSend) => {
				try {
					const response = await fetch("https://bookish-eureka-x5wrv97pxvg92w7x-3001.app.github.dev/api/login", {
						method:"POST",
						headers:{
							"Content-Type": "application/json",
						},
						body: JSON.stringify(dataToSend),
					});
			
					const responseData = await response.json();
			
					if (response.ok) {
						console.log("Inicio de sesión correcto", responseData);
						setStore({ auth: true });
			
						// Guardar el token de acceso en localStorage
						localStorage.setItem("token", responseData.access_token);
			
					} else {
						console.log("Error en el inicio de sesión", responseData);
					}
				} catch (error) {
					console.log("Error al realizar la solicitud", error);
				}

			},



			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
