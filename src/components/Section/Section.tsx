import type { ComponentsWithChildrenProps } from '../../types/photo'
import style from './Section.module.css'

export default function Section({ children }: ComponentsWithChildrenProps) {
	return <section className={style.section}>{children}</section>
}
