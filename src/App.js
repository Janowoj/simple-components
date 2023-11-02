import Sidebar from "./components/Sidebar";
import Route from "./components/Route";
import AccordionPage from "./pages/AccordionPage";
import DropdownPage from "./pages/DropdownPage";
import ButtonPage from "./pages/ButtonPage";
import ModalPage from "./pages/ModalPage";
import TablePage from "./pages/TablePage";
import CounterPage from "./pages/CounterPage";

function App() {
    return (
        <div className="container mx-auto grid grid-cols-3 gap-4 m-4">
            <Sidebar />
            <div className="col-span-2">
                <Route path='/accordion'>
                    <AccordionPage />
                </Route>
                <Route path='/'>
                    <DropdownPage />
                </Route>
                <Route path='/buttons'>
                    <ButtonPage />
                </Route>
                <Route path='/modal'>
                    <ModalPage />
                </Route>
                <Route path='/table'>
                    <TablePage />
                </Route>
                <Route path='/counter'>
                    <CounterPage initialCount={10} />
                </Route>
            </div>
        </div>
    )
}

export default App;