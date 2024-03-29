import { StyleSheet, ScrollView, View, Text } from "react-native";
import React from "react";
import MiniCardItem from "./MiniCardItem";

const MiniCards = () => {
	const rows = 2;
	const columns = 3;
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Featured</Text>
			<ScrollView
				style={styles.container}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
			>
				{[...Array(rows)].map((_, i) => (
					<View key={i}>
						{[...Array(columns)].map((_, j) => (
							<MiniCardItem key={j} id={i * 3 + j+ 1} widthPercent={0.8} />
						))}
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default MiniCards;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headingText: {
		fontSize: 24,
		fontWeight: "bold",
		margin: 10,
		position: "absolute",
		top: 0,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		margin: 10,
	},
});
