import Date from "../components/Date"
import History from "../components/History"
import Orders from "../components/Orders"
import Transactions from "../components/Transactions"

const HomePage = () => {
    return (
        <>
            <Date></Date>
            <Transactions></Transactions>
            <Orders></Orders>
            <History></History>
        </>
    )
}

export default HomePage;