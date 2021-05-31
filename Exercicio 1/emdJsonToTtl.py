import json

file = open("emd.json", encoding='utf8')
emds = json.load(file)
ttl = open("emd2.ttl",'w',encoding='utf-8')

modalidades = []
clubes = []
individuosEMD = []
for emd in emds:
    if emd['modalidade'] in modalidades:
        break
    else: modalidades.append(emd['modalidade'])

for emd in emds:
    if emd['clube'] in clubes:
        break
    else: clubes.append(emd['clube'])  

###  http://www.di.uminho.pt/prc2020/EMD#Futebol
#:Futebol rdf:type owl:NamedIndividual ,
#                  :Modalidade .
for modalidade in modalidades:
    ttl.write('###  http://www.di.uminho.pt/prc2020/EMD#'+modalidade+'\n')
    ttl.write(':'+modalidade + ' rdf:type owl:NamedIndividual ,\n')
    ttl.write('                  :Modalidade .\n\n')


###  http://www.di.uminho.pt/prc2020/EMD#GDGoma
#:GDGoma rdf:type owl:NamedIndividual ,
#                 :Clube .
for clube in clubes:
    ttl.write('###  http://www.di.uminho.pt/prc2020/EMD#'+clube+'\n')
    ttl.write(':'+clube + ' rdf:type owl:NamedIndividual ,\n')
    ttl.write('                  :Clube .\n\n')


###  http://www.di.uminho.pt/prc2020/EMD#60b3ee0ee00725274024d5a2
#<http://www.di.uminho.pt/prc2020/EMD#60b3ee0ee00725274024d5a2> rdf:type owl:NamedIndividual ,
#                                                                        :EMD ;
#                                                               :realizadoPor :Emily_Terrell ;
#                                                               :data "2020-07-27" ;
#                                                               :resultado "true"^^xsd:boolean .

for emd in emds:
    ttl.write("### http://www.di.uminho.pt/prc2020/EMD#" + emd['_id']+'\n')
    ttl.write("<http://www.di.uminho.pt/prc2020/EMD#" + emd['_id'] +"> rdf:type owl:NamedIndividual ,\n")
    ttl.write("                                                                        :EMD ;\n")
    ttl.write("                                                               :realizadoPor :"+emd['nome']['primeiro']+'_'+emd['nome']['último']+' ;\n')
    ttl.write("                                                               :data \""+emd['dataEMD']+"\" ;"+'\n')
    ttl.write("                                                               :resultado \""+str(emd['resultado'])+"\"^^xsd:boolean .\n\n")


###  http://www.di.uminho.pt/prc2020/EMD#Emily_Terrell
#:Emily_Terrell rdf:type owl:NamedIndividual ,
#                        :Atleta ;
#               :pertence :GDGoma ;
#               :praticaModalidade :Futebol ;
#               :realizou <http://www.di.uminho.pt/prc2020/EMD#60b3ee0ee00725274024d5a2> ;
#               :email "emily.terrell@gdgoma.org" ;
#               :federado "false"^^xsd:boolean ;
#               :genero "F" ;
#               :idade 28 ;
#              :morada "Clay" ;
#               :nome "Emily Terrell" .

for emd in emds:
    ttl.write("### http://www.di.uminho.pt/prc2020/EMD#" + emd['nome']['primeiro']+'_'+emd['nome']['último']+'\n')
    ttl.write(":"+emd['nome']['primeiro']+'_'+emd['nome']['último']+ " rdf:type owl:NamedIndividual ,\n")
    ttl.write("                        :Atleta ;\n")
    ttl.write("               :pertence :"+emd['clube'] +" ;\n")
    ttl.write("               :praticaModalidade :"+emd['modalidade']+" ;\n")
    ttl.write("               :realizou <http://www.di.uminho.pt/prc2020/EMD#"+emd['_id']+'> ;\n')
    ttl.write("               :email \""+emd['email']+"\" ;\n")
    ttl.write("               :federado \""+str(emd['federado'])+"\"^^xsd:boolean ;\n")
    ttl.write("               :genero \""+emd['género']+"\" ;\n")
    ttl.write("               :idade "+str(emd['idade'])+" ;\n")
    ttl.write("               :morada \""+emd['morada']+"\" ;\n")
    ttl.write("               :nome \""+emd['nome']['primeiro']+' '+emd['nome']['último']+"\" .\n\n")




print(modalidades)
print(clubes)