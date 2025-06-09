// src/App/ficha.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../components/items'


function Ficha() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/items/')
      .then(response => {
        setItens(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erro ao buscar itens:", error)
        setErro("Erro ao carregar os itens.")
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Carregando itens...</p>
  if (erro) return <p>{erro}</p>

  return (
    <div>
      <h2>Itens da Ficha</h2>
      {itens.length === 0 ? (
        <p>Nenhum item encontrado.</p>
      ) : (
        itens.map(item => <Item key={item.idSquare} item={item} />)
      )}
    </div>
  )
}

export default Ficha
