import Table from '../components/Table';

function TablePage() {

    const data = [
        { name: 'apple', color: 'bg-red-500', score: '5' },
        { name: 'banana', color: 'bg-yellow-500', score: '2' },
        { name: 'grape', color: 'bg-purple-500', score: '4' },
        { name: 'orange', color: 'bg-orange-500', score: '3' },
    ];

    const config = [
        {
            label: 'Name',
            render: (fruit) => fruit.name,
        },
        {
            label: 'Color',
            render: (fruit) => <div className={`p-3 m-2 ${fruit.color}`} />
        },
        {
            label: 'Score',
            render: (fruit) => fruit.score,
        },
        {
            label: 'Score squared',
            render: (fruit) => fruit.score ** 2,
            header: () => <th className='bg-red-500'>Score</th>
        }
    ]

    const keyFn = (fruit) => {
        return fruit.name;
    }

    return <div>
        <Table data={data} config={config} keyFn={keyFn} />
    </div>
}

export default TablePage;