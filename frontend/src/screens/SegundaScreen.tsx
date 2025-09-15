import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { LinearGradient } from "expo-linear-gradient";


type SegundaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Segunda">;
type Project = {
  name: string;
  description: string;
};


export default function SegundaScreen() {
  const navigation = useNavigation<SegundaScreenNavigationProp>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [doneProjects, setDoneProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const hoje = new Date();
  const dataFormatada = `${hoje.getDate().toString().padStart(2, "0")}/${
    (hoje.getMonth() + 1).toString().padStart(2, "0")
  }/${hoje.getFullYear()}`;

  // 🔹 Carregar projetos do backend
  useEffect(() => {
    const loadProjects = async () => {
      try {
  const resAndamento = await fetch('http://186.217.115.141:3000/projetos/andamento');
        const andamento = await resAndamento.json();
        setProjects(andamento);
  const resConcluidos = await fetch('http://186.217.115.141:3000/projetos/concluidos');
        const concluidos = await resConcluidos.json();
        setDoneProjects(concluidos);
      } catch (error) {
        console.log("Erro ao carregar projetos do backend:", error);
      }
    };
    loadProjects();
  }, []);

  // 🔹 Removido o auto-save local, agora só salva no backend pelos botões

  const addProject = () => {
    if (name.trim() && description.trim()) {
      setProjects([...projects, { name, description }]);
      setName("");
      setDescription("");
    }
  };

  const completeProject = (index: number) => {
    const project = projects[index];
    setDoneProjects([...doneProjects, project]);
    setProjects(projects.filter((_, i) => i !== index));
  };

  const deleteProject = (index: number, isDone = false) => {
    if (isDone) {
      setDoneProjects(doneProjects.filter((_, i) => i !== index));
    } else {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  return (
    <LinearGradient colors={["#4B0082", "#000000"]} style={styles.container}>
      <Text style={styles.date}>📂 Meus Projetos - {dataFormatada}</Text>

      {/* Inputs para Nome e Descrição */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Projeto"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <View style={{ width: "40%", alignSelf: "center" }}>
          <Button title="+" onPress={addProject} />
        </View>
      </View>

      {/* 🔹 Duas colunas: Em andamento | Concluídos */}
      <View style={styles.taskColumns}>
        {/* Projetos em andamento */}
        <View style={styles.taskColumn}>
          <Text style={styles.columnTitle}>🚀 Em andamento</Text>
          <FlatList
            data={projects}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.taskText}>{item.name}</Text>
                  <Text style={styles.subText}>{item.description}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => completeProject(index)}
                  style={styles.completeButton}
                >
                  <Text style={styles.completeText}>✅</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteProject(index)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>❌</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {/* Botão de salvar projetos em andamento */}
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Button title="Salvar" onPress={async () => {
              try {
                await fetch('http://186.217.115.141:3000/projetos/andamento', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(projects),
                });
                alert('Projetos em andamento salvos no servidor!');
              } catch (e) {
                alert('Erro ao salvar no servidor!');
              }
            }} />
          </View>
        </View>

        {/* Projetos concluídos */}
        <View style={styles.taskColumn}>
          <Text style={styles.columnTitle}>🎉 Concluídos</Text>
          <FlatList
            data={doneProjects}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskItem}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.taskText,
                      { textDecorationLine: "line-through", color: "lightgreen" },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.subText}>{item.description}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteProject(index, true)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {/* Botão de salvar projetos concluídos */}
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Button title="Salvar" onPress={async () => {
              try {
                await fetch('http://186.217.115.141:3000/projetos/concluidos', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(doneProjects),
                });
                alert('Projetos concluídos salvos no servidor!');
              } catch (e) {
                alert('Erro ao salvar no servidor!');
              }
            }} />
          </View>
        </View>
      </View>

      {/* Navegação */}
      <View style={styles.navButtons}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate("Primeira")}
        >
          <Text style={styles.navButtonText}>📋 Rotinas</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white", 
    width: '40%',
    alignSelf: 'center',
  },
  taskColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  taskColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#ddd",
  },
  completeButton: {
    marginRight: 10,
  },
  completeText: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
  },
  navButtons: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === 'android' ? 0 : 20,
    marginBottom: Platform.OS === 'android' ? 32 : 0,
    gap: 10,
  },
  navButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
