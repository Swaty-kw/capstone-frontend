import { FlatList, View, Text, Animated } from "react-native";
import React, {useState, useRef} from "react";
import onboardingData from "../../assets/onboardingData";
import CarouselItem from "./CarouselItem";
const Carousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
  
    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current;

    const dataRef = useRef(null)
    
    const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <FlatList
      style={{flex:1}}
      data={onboardingData}
      renderItem={({ item }) => <CarouselItem item={item} />}
      horizontal
      showHorizontalScrollIndicator
      pagingEnabled
      bounces={false}
      keyExtractor={(item) => item.id}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{
        useNativeDriver: false,
      }
      )}
      scrollEventThrottle={32}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewConfig}
      ref={dataRef}
    />
  );
};

export default Carousel;
