
export const search = () =>{
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const table = document.getElementById('dataTable') as HTMLTableElement;
    const tbody = table.querySelector('tbody') as HTMLTableSectionElement;
        
        
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        const rows = tbody.getElementsByTagName('tr');

        for (let row of rows) {
            const cells = row.getElementsByTagName('td');
            let match = false;
            
            for (let cell of cells) {
                if (cell.textContent?.toLowerCase().includes(searchText)) {
                    match = true;
                    break;
                }
            }

            row.style.display = match ? '' : 'none';
        }
    });
}

export const getDate = (dateToCoverter:Date) =>{
    const date: Date = dateToCoverter;
    const formattedDate: string = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;

}

export function generateThreeDigitId() {
    return Math.floor(100 + Math.random() * 900);
  }