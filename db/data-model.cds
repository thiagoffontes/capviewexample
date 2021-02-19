namespace my.bookshop;

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}

entity PoHeader {
    key PoNumber : Integer;
        Currency : String(3);
}

entity PoItem {
    key PoNumber : Integer;
    key ItemNumber : Integer;
        Value : Decimal(15,2);
}