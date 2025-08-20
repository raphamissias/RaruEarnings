import style from "./style.module.css"

const History = () => {

    return (
        <section className={style.history}>
            <h5>Histórico de lançamentos</h5>
            <div className={style.transactionsHistory}>
                <div className={style.totalReceived}>
                    <p className={style.transactionsDetail}>Salário</p>
                    <p className={style.date}>Data: 17/07/2025</p>
                    <p className={style.valueReceived}>+800,00</p>
                </div>
                <div className={style.debits}>
                    <p className={style.transactionsDetail}>Adiantamento</p>
                    <p className={style.date}>Data: 17/07/2025</p>
                    <p className={style.debit}>-18,60</p>
                </div>
                <div className={style.debits}>
                    <p className={style.transactionsDetail}>INSS</p>
                    <p className={style.date}>Data: 17/07/2025</p>
                    <p className={style.debit}>-171,07</p>
                </div>
                <div className={style.debits}>
                    <p className={style.transactionsDetail}>Bloco de notas</p>
                    <p className={style.date}>Data: 17/07/2025</p>
                    <p className={style.debit}>-47,90</p>
                </div>
            </div>
        </section>        
    )
}

export default History;