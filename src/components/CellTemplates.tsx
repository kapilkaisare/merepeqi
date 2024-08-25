export type CellTemplateProps = {
  value: AnimationPlaybackEvent
}

export const StatusCell = (props: CellTemplateProps ) => {
  return <span>{ props.value.toString() }</span>
}
