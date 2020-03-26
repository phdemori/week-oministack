import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import styles from './styles';

export default function Incidents(){
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncident(){
        if(loading){
            return;
        }

        if(total > 0 && total <= incidents.length){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(() => {
        loadIncident();
    }, []);

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
            data={incidents}
            onEndReached={loadIncident}
            onEndReachedThreshold={0.2}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item:incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.nome}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.titulo}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right' size={16} color='red' />
                    </TouchableOpacity>
                </View>
            )}
            />
        </View>
    );
}