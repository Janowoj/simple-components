import Table from '../components/Table';

function TablePage() {

    const data = [
        { name: 'apple', color: 'bg-red-500', score: '5' },
        { name: 'banana', color: 'bg-yellow-500', score: '2' },
        { name: 'grape', color: 'bg-purple-500', score: '4' },
        { name: 'orange', color: 'bg-orange-500', score: '3' },
    ];

    const config = [
        { label: 'Name' },
        { label: 'Color' },
        { label: 'Score' },
    ]


    return <div>
        <Table data={data} config={config} />
    </div>
}

export default TablePage;