export function formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }
  
    const dateParts = dateString.split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }