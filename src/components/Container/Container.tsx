import type { ComponentsWithChildrenProps } from '../../types/photo'
import styled from './Container.module.css'

export default function Container({ children }: ComponentsWithChildrenProps) {
	return <div className={styled.container}>{children}</div>
}
