import { useEffect, useRef, useState } from 'react'
import styles from '../select.module.css'
export type SelectOption = {
    label: string,
    value: string | number
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption 
    onChange: (value: SelectOption | undefined) => void
}
type MultipleSelectProps = {
    multiple: true
    value?: SelectOption[] 
    onChange: (value: SelectOption[] ) => void
}


type Props = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

const Select = ({ multiple, value, onChange, options}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const clearOptions = () => {
        multiple ? onChange([]) : onChange(undefined)
    }
    const selectOption = (option: SelectOption) => {
        if(multiple){
            if(typeof value !== "undefined" && value.includes(option)){
                onChange(value.filter(o => o !== option))
            }else{
                if(typeof value !== "undefined")
                onChange([...value, option])
            }
        }else{
            if(option !== value)  onChange(option)
        }
    }
    const isOptionSelected = (option: SelectOption) =>{

        return multiple ? value?.includes(option) : option === value
    }
    useEffect(() => {
        if(isOpen) setHighlightedIndex(0)
    },[isOpen])
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if(e.target != containerRef.current) return 
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)
                    if(isOpen) selectOption(options[highlightedIndex])
              break
              case "ArrowUp":
              case "ArrowDown":{
                if(!isOpen){
                    setIsOpen(true)
                    break
                }

                const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                if(newValue >= 0 && newValue < options.length){
                    setHighlightedIndex(newValue)
                }
            break
            }
            case "Escape":
                setIsOpen(false)
            break
            }
        }
            containerRef.current?.addEventListener("keydown", handler)

        return () => {
            containerRef.current?.removeEventListener("keydown", handler)

        }
    },[isOpen, highlightedIndex, options])
  return (
    <div ref={containerRef} onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} className={styles.container}>
        <span className={styles.value}>
            {
                multiple ? 
                value?.map(v => (
                    <button className={styles["option-badge"]} key={v.value} onClick={e => {
                        e.stopPropagation()
                        selectOption(v)
                    }}>
                        {v.label}
                        <span className={styles["remove-btn"]}>
                            &times;
                        </span>
                    </button>
                )) : value?.label
            }
        </span>
        <button onClick={e => {
            e.stopPropagation()
            clearOptions()
        }} className={styles["clear-btn"]}>
            &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
            {
                options.map((option, i) => (
                    <li onMouseEnter={() => setHighlightedIndex(i)}
                     onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }} key={option.value} className={`${styles.option} ${isOptionSelected(option) ?
                    styles.selected : ""} ${i === highlightedIndex ? styles.highlighted :  ""}`} >
                        {option.label}
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Select