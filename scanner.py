Pills = [["5449000265197","54493957","5760466976350","1"],["5030341502005","96187159","5000328987750","2"],["5000328490557","5027952011835","5016873018146","3"],["5618000593822","5060055460155","X001CRD8HP","4"]]

while len(Pills) != 0:
    Barcode1 = input()
    Barcode2 = input()
    Barcode3 = input()
    
    if Barcode1 == Pill[0][0] and Barcode2 == Pill[0][1] and Barcode3 == Pill[0][2]:
        print("Success, "+Pill[0][3]+" pill is chosen")
        Pills.remove(Pill[0])
        # Send token to arduino
        continue
    print("Failure")

print("All Pills Scanned")