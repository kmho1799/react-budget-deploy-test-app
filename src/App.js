import { useState } from "react";
import "./App.css"
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const App = () => {

  const [id, setId] = useState("");

  const [edit, setEdit] = useState(false);

  const [charge, setCharge] = useState("");

  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState(false);

  //함수형 컴포넌트
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 2000 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 1200 }
  ])

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     expenses: [
  //       { id: 1, charge: "렌트비", amount: 1600},
  //       { id: 2, charge: "교통비", amount: 400},
  //       { id: 3, charge: "식비", amount: 1200},
  //     ]
  //   }
  // }
  const handleCharge = (e) => {
    // setCharge(e.)
    // console.log(e.target.value)
    setCharge(e.target.value)
  }

  const handleAmount = (e) => {
    // setCharge(e.)
    // console.log(e.target.value)
    // console.log(e.target.valueAsNumber)
    setAmount(e.target.valueAsNumber)
  }

  const handleDelete = (id) => {
    // const NewExpenses = this.state.expenses.filter(expense => expense.id != id)
    const newExpenses = expenses.filter(expense => expense.id != id)
    // console.log(newExpenses)
    setExpenses(newExpenses)
    handleAlert({type: "danger", text: "아이템이 삭제되었습니다."})
    // this.setState({expenses: NewExpenses})
  }

  const handleSubmit = (e) => {
    //기본 동작 제거
    e.preventDefault()
    if(charge !== "" && amount != 0){
      if(!edit){
        const newExpense = {id: crypto.randomUUID(), charge, amount}
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)
        handleAlert({type: "success", text: "아이템이 생성되었습니다."})
      }
      else {
        const newExpenses = expenses.map(item => {
          return (item.id == id ? {...item, charge, amount} : item);
        });
        //console.log(newExpenses)

        setExpenses(newExpenses)
        // 안 좋은 예 인듯
        // const expense = expenses.find(item => item.id == id)
        // expense.charge = charge
        // expense.amount = amount

        setEdit(false)
        handleAlert({type : "success", text : "아이템이 수정되었습니다."})
      }
      setCharge("")
      setAmount(0)
    }
    else{
      console.log('error');
      handleAlert({type: "danger", text: "charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다."})
    }
  }

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text})
    setTimeout(() => {
      setAlert({show: false});
    }, 7000);
  }

  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id == id)
    setAmount(expense.amount)
    setCharge(expense.charge)
    setId(expense.id)
    setEdit(true)
  }

  const clearItems = () => {
    setExpenses([])
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
      <h1>예산 계산기</h1>
      <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}>
        {/* Expense Form*/}
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>

      <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}>
        {/* Expense List*/}
        <ExpenseList 
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div style={{display:'flex', justifyContent:'end', marginTop:'1rem'}}>
        <p style={{ fontSize: '2rem'}}>총 지출 : 
          {expenses.reduce((acc, curr) => {
            return(acc += curr.amount)
          }, 0)}  
          원
        </p> 
      </div>
    </main>
  )
}

export default App;