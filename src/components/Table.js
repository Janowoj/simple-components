function Table({ data }) {

    const renderedRows = data.map((fruit) => {
        return (
            <tr key={fruit.name}>
                <td>{fruit.name}</td>
                <td>{fruit.color}</td>
                <td>{fruit.score}</td>
            </tr>
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>fruit</th>
                    <th>color</th>
                    <th>score</th>
                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table>
    )
}

export default Table;