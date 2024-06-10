import { useState, useEffect, useRef } from 'react';
import {View, FlatList} from 'react-native';
import Animated, { Layout, FadeInLeft, FadeOutRight } from 'react-native-reanimated';

const DATA = [
    {
        image: 'https://blog-static.petlove.com.br/wp-content/uploads/2021/08/Gato-filhote-1.jpg?_gl=1*lvdu4o*_gcl_au*NDAzMzQ4NDUwLjE3MTgwNTAwNDI.&_ga=2.122175944.2120478634.1718050042-263046695.1718050042'
    },
    {
        image: 'https://blog-static.petlove.com.br/wp-content/uploads/2021/08/Gato-filhote-1.jpg?_gl=1*lvdu4o*_gcl_au*NDAzMzQ4NDUwLjE3MTgwNTAwNDI.&_ga=2.122175944.2120478634.1718050042-263046695.1718050042'
    },
    {
        image: 'https://blog-static.petlove.com.br/wp-content/uploads/2021/08/Gato-filhote-1.jpg?_gl=1*lvdu4o*_gcl_au*NDAzMzQ4NDUwLjE3MTgwNTAwNDI.&_ga=2.122175944.2120478634.1718050042-263046695.1718050042'
    },
];

export const Carousel = () => {
    const [activeBanner, setActiveBanner] = useState(0);

    return (
        <FlatList 
            data={DATA} renderItem={({ item, index}) => (
                <View>
                    <Image source={{uri: item.image}} />
                </View>
            )} keyExtractor={(item,index) => String(index)}
        />
    );
};