export const lidMotifs={
 olive:'Оливковая ветвь',ginkgo:'Листья гинкго',fern:'Папоротник',tide:'Прилив',pebbles:'Галька',grain:'Годичные кольца'
} as const;
export type LidMotif=keyof typeof lidMotifs;
