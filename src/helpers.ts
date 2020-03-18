
export const getMessageOfError = (label:string)=> (error: any) => `[${label}]: ${error.message}`;

