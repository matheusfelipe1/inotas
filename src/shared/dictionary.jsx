

class Dictionary {

    formattedDates = (query) => {
        const newQuery = String(query);
        const [param] = newQuery.split('T');
        const list = param.split('-').reverse();
        return list.join('/')
    }
}

export default Dictionary