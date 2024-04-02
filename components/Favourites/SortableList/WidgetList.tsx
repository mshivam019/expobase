import React, { useState } from "react";

import { MARGIN } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { ScrollView, ActivityIndicator, View, Text } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useUserStore } from "../../../store";
import { useFocusEffect } from "expo-router";

const WidgetList = () => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useUserStore();

	const fetchFavorites = async () => {
		try {
			const { data, error } = await supabase
				.from("stars")
				.select("writing_id")
				.eq("user_id", user?.id);

			if (error) console.log("error", error);
			if (data && data?.length > 0) {
				const content = await supabase
					.from("user_writings")
					.select("id,poster_image_url,title")
					.in(
						"id",
						data.map((d) => d.writing_id)
					);
				if (content.error) console.log("error", content.error);
				if (content.data && content.data?.length > 0) {
					setData(content.data);
				}
			}
		} catch (error) {
			console.log("error", error);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(() => {
		fetchFavorites();
	});

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}
	if (data.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
						color: "#000",
					}}
				>
					No favorites yet
				</Text>
			</View>
		);
	}
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={{
				paddingHorizontal: MARGIN,
				marginTop: 20,
				flex: 1,
			}}
		>
			<SortableList
				editing={true}
				length={data.length}
				onDragEnd={(positions) => console.log(positions)}
			>
				{[...data].map((tile, index) => (
					<Tile
						onLongPress={() => true}
						key={tile.id + "-" + index}
						card={tile}
						id={tile.id}
					/>
				))}
			</SortableList>
		</ScrollView>
	);
};

export default WidgetList;