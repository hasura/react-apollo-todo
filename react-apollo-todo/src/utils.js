const getHeaders = token => {
	const headers = {
	  authorization: token ? `Bearer ${token}` : ""
	};
	return headers;
};

export { getHeaders };
