import Aprovacoes from '@assets/home/icons/aprovacoes/aprovacoes.png'
import arquivo from '@assets/home/icons/arquivo/arquivo.png'
import bi from '@assets/home/icons/bi/bi.png'
import intranet from '@assets/home/icons/intranet/intranet.png'
import requisicoes from '@assets/home/icons/requisicoes/requisicoes.png'
import rh from '@assets/home/icons/rh/rh.png'

export type ButtonHomeListProps = {
	id: number
	enabled: boolean
	label: string
	imagePath: string
	imagePadding?: number
	onPressGoToScreen?: string
}

export const buttonHomeList: ButtonHomeListProps[] = [
	{
		id: 1,
		enabled: true,
		label: 'Aprovações',
		imagePath: Aprovacoes,
		imagePadding: 13,
		onPressGoToScreen: 'MyApprovals',
	},
	{
		id: 2,
		enabled: false,
		label: 'Requisições',
		imagePath: requisicoes,
	},
	{
		id: 3,
		enabled: false,
		label: 'BI',
		imagePath: bi,
	},
	{
		id: 4,
		enabled: false,
		label: 'Arquivos',
		imagePath: arquivo,
	},
	{
		id: 5,
		enabled: false,
		label: 'Intranet',
		imagePath: intranet,
	},
	{
		id: 6,
		enabled: false,
		label: 'RH',
		imagePath: rh,
	},
]
