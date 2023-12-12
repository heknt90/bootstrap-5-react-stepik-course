function TotalPriceMenu({totalPrice}) {
  return (
    <div className="menu">
      <div className="price_title">Итого: <span className="price_result">{totalPrice} &#8381;</span></div>
    </div>
  )
}

export default TotalPriceMenu