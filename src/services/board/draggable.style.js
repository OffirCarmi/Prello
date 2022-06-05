

export const draggableStyle = {
    getStyle
}

function getStyle(style, snapshot) {
    if (snapshot.isDropAnimating) {
        const { moveTo, curve, duration } = snapshot.dropAnimation
        console.log('getStyle - snapshot.dropAnimation', curve)
        
        const skew = `rotate(0deg)`
        const translate = moveTo ? `translate(${moveTo.x}px, ${moveTo.y}px)` : ''

        return {
            ...style,
            transform: `${translate} ${skew} `,
        }
    }

    else if (snapshot.isDragging) {
        const skew = `rotate(3deg)`
        return {
            ...style,
            transform: `${style.transform} ${skew}`,
        }
    }
    else {
        return style
    }
}