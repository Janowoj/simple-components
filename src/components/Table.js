function Table({ data }) {
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
                <tr>
                    <td>apple</td>
                    <td>red</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>banana</td>
                    <td>yellow</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>grape</td>
                    <td>purple</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>orange</td>
                    <td>orange</td>
                    <td>3</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;