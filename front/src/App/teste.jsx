import React, { useState, useEffect } from "react";
import Inventory from "../components/Inventory";
import api from '../apiAcess';

const Teste = () => {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        api.get('/user/items/')
            .then(response => {
                setItens(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar itens:", error);
                setErro("Erro ao carregar os itens.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Carregando itens...</p>;
    if (erro) return <p>{erro}</p>;

    // Transforma os dados da API no formato esperado pelo Inventory
    const mappedItems = itens.map(item => ({
        id: item.id,
        user: item.user,
        nameSquare: item.item_base.nameSquare,
        widthSquare: item.item_base.widthSquare,
        heightSquare: item.item_base.heightSquare,
        imageSquare: item.item_base.imageSquare || null,
        maxUsageSquare: item.item_base.maxUsageSquare,
        currentUsageSquare: item.currentUsageSquare ?? item.item_base.currentUsageSquare,
        positionX: item.PositionX,
        positionY: item.PositionY,
    }));

    //console.log(mappedItems);

    return (
        <div>
            <h2>Custom Grid Display</h2>
            <Inventory items={mappedItems} gridWidth={5} gridHeight={2} />
        </div>
    );
};

export default Teste;
