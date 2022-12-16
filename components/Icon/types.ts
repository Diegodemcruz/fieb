import * as Icon from '@expo/vector-icons'

type AntDesignIconNames = keyof typeof Icon['AntDesign']['glyphMap']
type FeatherIconNames = keyof typeof Icon['Feather']['glyphMap']
type FontAwesomeIconNames = keyof typeof Icon['FontAwesome']['glyphMap']
type MaterialIconNames = keyof typeof Icon['MaterialIcons']['glyphMap']
type OctIconNames = keyof typeof Icon['Octicons']['glyphMap']
type IonicIconNames = keyof typeof Icon['Ionicons']['glyphMap']
type FoundationIconNames = keyof typeof Icon['Foundation']['glyphMap']
type MaterialCommunityIconNames = keyof typeof Icon['MaterialCommunityIcons']['glyphMap']
type SimpleLineIconNames = keyof typeof Icon['SimpleLineIcons']['glyphMap']
type ZocialIconNames = keyof typeof Icon['Zocial']['glyphMap']
type EvilIconNames = keyof typeof Icon['EvilIcons']['glyphMap']
type SimpleIconNames = keyof typeof Icon['SimpleLineIcons']['glyphMap']
type EntypoIconNames = keyof typeof Icon['Entypo']['glyphMap']

export type IconFamilyProps =
	| {
			family: 'AntDesign'
			name: AntDesignIconNames
	  }
	| {
			family: 'Feather'
			name: FeatherIconNames
	  }
	| {
			family: 'FontAwesome'
			name: FontAwesomeIconNames
	  }
	| {
			family: 'MaterialIcons'
			name: MaterialIconNames
	  }
	| {
			family: 'Octicons'
			name: OctIconNames
	  }
	| {
			family: 'Ionicons'
			name: IonicIconNames
	  }
	| {
			family: 'Foundation'
			name: FoundationIconNames
	  }
	| {
			family: 'MaterialCommunityIcons'
			name: MaterialCommunityIconNames
	  }
	| {
			family: 'SimpleLineIcons'
			name: SimpleLineIconNames
	  }
	| {
			family: 'Zocial'
			name: ZocialIconNames
	  }
	| {
			family: 'EvilIcons'
			name: EvilIconNames
	  }
	| {
			family: 'SimpleLineIcons'
			name: SimpleIconNames
	  }
	| {
			family: 'Entypo'
			name: EntypoIconNames
	  }
