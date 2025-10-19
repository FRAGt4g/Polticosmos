import trace
import gensim
import os
import smart_open


corpus_file =  'bills.cor'
model_file = 'MODEL.model'

def read_corpus(fname, tokens_only=False):
    with smart_open.open(fname, encoding="utf-8") as f:
        for i, line in enumerate(f.read().split('\n')):
            if tokens_only:
                yield gensim.utils.simple_preprocess(line)
            else:
                yield gensim.models.doc2vec.TaggedDocument(
                    gensim.utils.simple_preprocess(line), [i]
                )

train_corpus = list(read_corpus(corpus_file))

if os.path.exists(model_file):
    model = gensim.models.doc2vec.Doc2Vec.load(model_file)
else:
    model = gensim.models.doc2vec.Doc2Vec(vector_size=50, min_count=2, epochs=50)
    model.build_vocab(train_corpus)
    model.train(train_corpus, total_examples=model.corpus_count, epochs=model.epochs)
    model.save(model_file)

array = [[None for n in range(len(train_corpus))] for n in range(len(train_corpus))]

for num in range(len(train_corpus)):
    for sim_id, sim_score in model.dv.most_similar(num, topn=len(train_corpus)):
        array[num][sim_id] = sim_score
    array[num][num] = 1

with open("similarityMatrix.txt", "w") as f:
    for row in array:
        for col in row:
            f.write(str(col) + " ")
        f.write("\n")



'''while True:
    choice = input("Choose an option (1/2/3): ").strip()
    if choice == "3":
        break
    if choice == "1":
        query = input("Enter words to search: ").strip()
        query_tokens = gensim.utils.simple_preprocess(query)
        if not query_tokens:
            continue
        inferred_vector = model.infer_vector(query_tokens)
        sims = model.docvecs.most_similar([inferred_vector], topn=5)
        for doc_id, sim in sims:
            print(f"\nDoc {doc_id} (Similarity: {sim:.3f})")
            print("Summary:", " ".join(train_corpus[doc_id].words)[:500], "...\n")
    elif choice == "2":
        try:
            doc_num = int(input("Enter document number: "))
            if doc_num < 0 or doc_num >= len(train_corpus):
                continue
            print(f"\nDocument {doc_num}:")
            print("Summary:", " ".join(train_corpus[doc_num].words))
            sims = model.docvecs.most_similar(doc_num, topn=5)
            for sim_id, sim_score in sims:
                print(f"\nDoc {sim_id} (Similarity: {sim_score:.3f})")
                print("Summary:", " ".join(train_corpus[sim_id].words)[:500], "...\n")
        except ValueError:
            continue
    else:
        continue'''
