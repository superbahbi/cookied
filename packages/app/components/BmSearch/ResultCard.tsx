import { IBookmark } from "app/store/slices/bmShelfSlice";
import { activeEntityIdAtom } from "app/store/slices/compoState";
import { useAtom } from "jotai";
import { FC } from "react";
import { Text, View } from "dripsy";
import { useMemo } from "react";
import { MotiPressable } from "moti/interactions";
import { activeUrlAtom } from "app/screens/HomeScreen/TreePanel";

interface IResultCard {
	item: IBookmark;
}

export const ResultCard: FC<IResultCard> = ({ item }) => {
	const [, setActiveEntityId] = useAtom(activeEntityIdAtom);
	const [, setActiveUrl] = useAtom(activeUrlAtom);

	return (
		<View
			sx={{ bg: "surfaceHigh", px: "$4", py: "$3", borderRadius: 15, mt: "$3" }}
		>
			<MotiPressable
				onPress={() => {
					setActiveEntityId(item._id);
					setActiveUrl(item.url);
				}}
				animate={useMemo(
					() =>
						({ hovered, pressed }) => {
							"worklet";
							return { opacity: hovered || pressed ? 0.5 : 1 };
						},
					[],
				)}
			>
				<Text numberOfLines={2} variant="semibold">
					{item.title}
				</Text>
				<Text numberOfLines={1}>{item.url}</Text>
			</MotiPressable>
		</View>
	);
};
