 //Global Variables
var currentSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Current')
var pastSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Past')
var archiveSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Archive')
var currDateFormatted = Utilities.formatDate(new Date(), "CST", "E, MM d,")
var currDate = new Date()

//Insert new column and copy data over
function newDayDataTransfer() {
  //insert new column in pastSheet
  pastSheet.insertColumnBefore(2);
  //copy data from previous day
  currentSheet.getRange(1,2,31,1).copyTo(pastSheet.getRange(1,2,31,1), SpreadsheetApp.CopyPasteType.PASTE_NORMAL)
  //delete previous days data
  currentSheet.deleteColumn(2);
  //insert new column in archive sheet
  archiveSheet.insertColumnBefore(2);
  //copy over (now the twelfth) row to archive sheet
  pastSheet.getRange(1,12,31,1).copyTo(archiveSheet.getRange(1,2,31,1), SpreadsheetApp.CopyPasteType.PASTE_NORMAL)
  //delete pastSheet eleventh day
  pastSheet.deleteColumn(12);
  //insert new column on the furthest right row
  currentSheet.insertColumnAfter(38)
  //add next date in sequence to new column (column 39)
  var dateToProcess = new Date(currentSheet.getRange(2,38).getValue());
  currentSheet.getRange(2,38).setValue(new Date(dateToProcess.setDate(dateToProcess.getDate() + 1))).setNumberFormat('ddd", "mm" "dd","');

}
