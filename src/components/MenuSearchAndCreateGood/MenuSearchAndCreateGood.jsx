import { Modal } from 'bootstrap';
import './MenuSearchAndCreateGood.css';

function MenuSearchAndCreateGood({searchInputText, searchInputOnChange, modalRef}) {

  const onClickHandler = () => {
    const modal = new Modal(modalRef.current)
    modal.show()
  }

  return (
    <div className="menu">
      <input type="text" placeholder="Поиск" className="search" value={searchInputText} onChange={e => searchInputOnChange(e.target.value)} />
      <button className="add btn btn-success" onClick={onClickHandler}>&#10010;</button>
    </div>
  )
}

export default MenuSearchAndCreateGood