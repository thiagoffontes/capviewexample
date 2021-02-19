using my.bookshop as my from '../db/data-model';

service CatalogService {
    @readonly entity Books as projection on my.Books;

    @readonly entity PoHeader as projection on my.PoHeader;
    @readonly entity PoItem as projection on my.PoItem;

    //inner join com lowercase (usado em filtros)
    entity Purchases as 
        select from 
        my.PoHeader as po 
        inner join my.PoItem as pi 
        on po.PoNumber = pi.PoNumber {
            po.PoNumber , po.Currency, 
            pi.ItemNumber, pi.Value,
            lower(po.Currency) as UpperCurrency : String
    };

    //join com soma
    entity PurchasesSumValue as 
        select from 
        my.PoHeader as po 
        inner join my.PoItem as pi 
        on po.PoNumber = pi.PoNumber {
            po.PoNumber , po.Currency, 
            sum(pi.Value) as ValueSum : Decimal
        }
        group by po.PoNumber;

    //join com máximo
    entity PurchasesMaxValue as 
        select from 
        my.PoHeader as po 
        inner join my.PoItem as pi 
        on po.PoNumber = pi.PoNumber {
            po.PoNumber , po.Currency, 
            max(pi.Value) as ValueMax : Decimal
        }
        group by po.PoNumber;

        //exemplo subselect
        entity PurchasesSub as 
            select from 
            my.PoHeader as po
            {
                po.PoNumber , po.Currency, 
                (SELECT from my.PoItem as pi { 
                    max(Value) as ValueMax : Decimal
                })  as ValueMax : Decimal
            };

    function getNewId() returns Integer;

    function testeMultiInsertSuccess() returns Integer;

    function testeMultiInsertError() returns Integer;

}