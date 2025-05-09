import Svg, { Path } from 'react-native-svg';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CurvedMenuBackground() {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
                <Path
                    d="M 0 100 Q 0 40 40 0 L 100 0 L 100 100 Z"
                    fill="#FFB74D"
                    opacity={1}
                />
            </Svg>
        </View>
    );
}
